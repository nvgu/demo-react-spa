import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import App from "./app.jsx";
import {Provider} from "react-redux";
import offers from '../../test-mocks/offers.js';
import {AuthStatus} from '../../const.js';

const mockStore = configureStore([]);

it(`Should App component render correctly when offers is loaded with success`, () => {

  const store = mockStore({
    offers: {
      data: offers,
      isLoading: false,
      isError: false,
      sortType: 0
    },
    nearbyOffers: {
      data: offers,
      isLoading: false,
      isError: false,
    },
    city: {
      currentCity: offers[0].city,
      coords: offers[0].cityCoords,
      zoom: offers[0].cityZoom,
    },
    reviews: {
      data: [],
      isLoading: true,
      isError: false,
    },
    user: {
      authorizationStatus: AuthStatus.NO_AUTH,
      data: []
    }
  });

  const render = renderer.create(
      <Provider store={store}><App /></Provider>,
      {
        createNodeMock: () => {
          return document.createElement(`section`);
        }
      }
  ).toJSON();

  expect(render).toMatchSnapshot();
});

it(`Should App component render correctly when offers is fetching`, () => {

  const store = mockStore({
    offers: {
      data: offers,
      isLoading: true,
      isError: false,
    },
    city: {
      currentCity: offers[0].city,
      coords: offers[0].cityCoords,
      zoom: offers[0].cityZoom,
    },
    user: {
      authorizationStatus: AuthStatus.NO_AUTH,
      data: []
    }
  });

  const render = renderer.create(
      <Provider store={store}><App onTitleLinkClick={() => {}}/></Provider>,
      {
        createNodeMock: () => {
          return document.createElement(`section`);
        }
      }
  ).toJSON();

  expect(render).toMatchSnapshot();
});

it(`Should App component render correctly when offers is loaded with error`, () => {

  const store = mockStore({
    offers: {
      data: [],
      isLoading: false,
      isError: true,
    },
    city: {
      currentCity: offers[0].city,
      coords: offers[0].cityCoords,
      zoom: offers[0].cityZoom,
    },
    user: {
      authorizationStatus: AuthStatus.NO_AUTH,
      data: []
    }
  });

  const render = renderer.create(
      <Provider store={store}><App onTitleLinkClick={() => {}}/></Provider>,
      {
        createNodeMock: () => {
          return document.createElement(`section`);
        }
      }
  ).toJSON();

  expect(render).toMatchSnapshot();
});
