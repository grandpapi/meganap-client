import React from 'react';
import PropTypes from 'prop-types';
import EndpointLink from './EndpointLink';

export default function AllDbEndpointsList({ username, dbNames, models }) {
  const endpoints = dbNames.map((dbName, i) => {
    return <li key={dbName}>
      <h3>{`${dbName}: `}</h3>
      <ul>
        {models[i].map(model => {
          return (
            <li key={model._id}>
              <EndpointLink username={username} dbName={dbName} mdlName={model.mdlName} />
            </li>
          );
        })}
      </ul>
    </li>;
  });
  return (
    <>
    <ul>
      {endpoints}
    </ul>
    </>
  );
}

AllDbEndpointsList.propTypes = {
  username: PropTypes.string.isRequired,
  dbNames: PropTypes.array.isRequired,
  models: PropTypes.array.isRequired 
};