import { observable, action, toJS, computed } from 'mobx';
import BSMobxStore from 'bs_react_lib/stores/BSMobxStore2';

export default class RecommendationStore extends BSMobxStore {

    @observable
    recommendations = []

    @action
    setCurrentRecommendations(recommends) {
        this.recommendations = recommends;
    }
}