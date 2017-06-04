import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import { parse } from 'react-docgen';
import { kebabCase } from 'lodash/string';

import { GITHUB_URL, VERSION } from 'constants/application';
import isPrivate from './isPrivate';
import prettifyProp from './prettifyProp';

const readFile = Promise.promisify(fs.readFile);

const BASE_SOURCE = `${GITHUB_URL}/blob/release/${VERSION.replace(/0(-.*)?/, 'x')}`;
const CONTAINERS = ['DatePicker', 'TimePicker', 'Snackbar'];

export async function createComponentDocgen(folder, fullPath, file, customPropTypes) {
  try {
    const fileName = `${file}${CONTAINERS.indexOf(file) !== -1 ? 'Container' : ''}.js`;
    const source = await readFile(path.join(fullPath, fileName), 'UTF-8');
    const { description, methods, props } = await parse(source.replace(/ComposedComponent => /, ''));
    return {
      source: `${BASE_SOURCE}/src/js/${folder}/${fileName}`,
      component: file,
      methods: methods.filter(m => !isPrivate(m.name)),
      props: Object.keys(props).reduce((list, propName) => {
        const prop = props[propName];
        if (!isPrivate(propName) && !prop.description.match(/@access private/)) {
          list.push(prettifyProp(prop, propName, customPropTypes, file));
        }

        return list;
      }, []),
      description,
    };
  } catch (e) {
    throw new Error(`There was an error creating docgen for \`${fileName}\`. ${e.message}`);
  }
}

export default async function createComponentsDocgen({ folder, fullPath, components }, customPropTypes) {
  const docgens = await Promise.all(components.map(component => createComponentDocgen(folder, fullPath, component, customPropTypes)));
  return {
    docgens,
    group: kebabCase(folder),
  };
}
