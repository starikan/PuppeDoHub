import * as _ from 'lodash';

/*
    commit("SET_someValInStore", value) - Simple data rewrite
    commit({
        type: "SET_someValInStore",
        path: "some.path.in.object.without.root" || ["some, "path, ...],
        value: value
    })
    Naming:
        - SET_value - autogenerate setter for all values in state
        - SOMEACTION_value - mutate value in state (UPDATE_flow)
        - SOMEACTION_SOMEPART_value - mutate part of value (UPDATE_LINK_flow)
*/

export default (stateObj: object) =>
  Object.assign(
    { __init__: function(state: object, val: any) {} },
    ..._.map(stateObj, (data: any, key: string) => {
      return {
        ['SET_' + key]: function(state: object, val: string | number | { path: string; value: string }) {
          if (_.isObject(val)) {
            _.set(state, [key, val.path], val.value);
          } else {
            _.set(state, [key], val);
          }
        },
      };
    }),
  );
