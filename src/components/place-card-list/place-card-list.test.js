import React from "react";
import renderer from "react-test-renderer";
import PlaceCardList from "./place-card-list.jsx";
import offers from '../../test-mocks/offers.js';
import {BrowserRouter} from 'react-router-dom';

it(`Should PlaceCardList component render correctly`, () => {

  const render = renderer.create(
      <BrowserRouter>
        <PlaceCardList
          offers={offers}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
          onFavoriteClick={() => {}}
        />
      </BrowserRouter>
  )
  .toJSON();

  expect(render).toMatchSnapshot();
});
