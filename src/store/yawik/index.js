import {
  GET_SETTINGS,
  SET_SETTINGS,
  SET_SEARCH,
  GET_SEARCH
} from '../names';

const userSettings = {
  miscDarkmode: 'auto',
  miscTimezone: '',
  country: null,
  useBrowserLanguage: true,
  defaultLanguage: '',
  orgName: '',
  orgDescriptionLabel: '',
  orgDescription: '',
  orgContactInfoLabel: '',
  orgContactInfo: '',
  jobsStatsEnabled: true,
  formSpellcheckEnabled: true,
};
const jobSearch = {
  query: null,
  location: null,
  distance: '',
  coordinates: {
    lat: null,
    lng: null
  }
};

export default
{
  state()
  {
    return {
      settings: userSettings,
      lang: null,
      search: jobSearch
    };
  },
  getters:
    {
      [GET_SETTINGS](state)
      {
        return state.settings;
      },
      [GET_SEARCH](state)
      {
        return state.search;
      },
    },
  mutations:
    {
      [SET_SETTINGS](state, obj)
      {
        state.settings[Object.keys(obj)[0]] = Object.values(obj)[0];
      },
      [SET_SEARCH](state, obj)
      {
        // console.log(obj)
        state.search[Object.keys(obj)[0]] = Object.values(obj)[0];
        //   console.log(JSON.stringify(state))
      }
    }
};
