import Ember from 'ember';
import {isAjaxError, isNotFoundError, isForbiddenError, isServerError} from 'ember-ajax/errors';

export default Ember.Controller.extend({
    ajax: Ember.inject.service(),
    loading: false,
    error: false,
    init: function() {
        this._super();
        this.get('ajax').request('health-analytics-api/stats')
            .then((result) => {
                this.set('stats', result);
            });
    },
    toECL: function (conceptString) {
        if (conceptString.indexOf('|') !== -1) {
            // Has label
            // Strip and label and convert to descendants and self
            return "<<" + conceptString.split(" ")[0];
        } else {
            // Assume ECL already
            return conceptString;
        }
    },
    getWording : function (typeId, tense){
        
        
    },
    actions: {
        addQueryRefinement(model){
            model.pushObject(
                {
                    "ecl": "",
                    "has": true,
                    "includeDaysInFuture": '*',
                    "includeDaysInPast": '*',
                    "limitation": "64572001",
                    "fsn": ""
                }
            );
        },
        deleteRefinement(index, refinements) {
            refinements.removeAt(index);
        },
        addTests(model){
            var testOutcome = {
                "ecl": "",
                "has": true,
                "includeDaysInFuture": '*',
                "includeDaysInPast": 0,
                "limitation": "64572001"
              };
            this.set('model.testOutcome', testOutcome);
            var testVariable = {
                "ecl": "",
                "has": true,
                "includeDaysInFuture": '*',
                "includeDaysInPast": 0,
                "limitation": "64572001"
              };
            this.set('model.testVariable', testVariable);
        },
        removeTests(model){
            this.set('model.testOutcome', null);
            this.set('model.testVariable', null);
        },
        fetchCohort() {
            this.set('loading', true);
            this.set('error', false); 
            console.log(this.get('model'));
            var gender;
            let primaryExposure = this.get('model.primaryExposure');
            let primaryExposureECL = this.toECL(primaryExposure);
            this.set('model.gender', $('#genderSelect').find(":selected").text());
            if(this.get('model.gender') !== null && this.get('model.gender') !== undefined){
                gender = this.get('model.gender').toUpperCase();
            }

            let inclusionCriteria = this.get('model.inclusionCriteria');

            let inclusionCriteriaArray = [];
            let postData = null;
            if (Ember.isPresent(inclusionCriteria)) {
                inclusionCriteria.forEach(function (item){
                    var inclusionCriteriaData = {};
                    if(item.ecl !== ""){
                        if(item.ecl.indexOf("<<") === -1 && item.ecl.indexOf(">>") === -1){
                            inclusionCriteriaData.ecl = "<< " + item.ecl;
                        }
                        else{
                            inclusionCriteriaData.ecl = item.ecl;
                        }
                        if(item.includeDaysInPast !== null && item.includeDaysInPast !== undefined){
                            if(item.includeDaysInPast === '*'){
                                Ember.set(item, 'includeDaysInFuture', -1);
                                Ember.set(item, 'includeDaysInPast', -1);
                            }
                            inclusionCriteriaData.includeDaysInPast = item.includeDaysInPast;
                            inclusionCriteriaData.includeDaysInFuture = item.includeDaysInPast;
                        }
                        inclusionCriteriaData.has = item.has;
                        inclusionCriteriaArray.push(inclusionCriteriaData);

                    }
                });
                
            }
            
            console.log("fetch cohort for " + primaryExposureECL + " with inclusionCriteria" + inclusionCriteriaArray);
            if(primaryExposure.indexOf("<<") === -1 && primaryExposure.indexOf(">>") === -1){
                primaryExposure = "<< " + primaryExposure;
            }
            postData = {
                    primaryCriterion:  {
                        "ecl": primaryExposure
                      },
                    additionalCriteria: inclusionCriteriaArray
                };
            
            if(this.get('model.gender') !== null && this.get('model.gender') !== undefined && this.get('model.gender').length !== 0){
                postData.gender = this.get('model.gender').toUpperCase();
            }
            if(this.get('model.ageMin') !== null && this.get('model.ageMin') !== undefined){
                postData.minAge = this.get('model.ageMin');
            }
            if(this.get('model.ageMax') !== null && this.get('model.ageMax') !== undefined){
                postData.maxAge = this.get('model.ageMax');
            }
            let testOutcome = this.get('model.testOutcome');
            let testVariable = this.get('model.testVariable');
            var loading = this.get('loading');
            var error = this.get('error');
            if (Ember.isPresent(testOutcome)) {
                if(testOutcome.includeDaysInFuture === '*'){
                                Ember.set(testOutcome, 'includeDaysInFuture', -1);
                            }
                if(testVariable.includeDaysInFuture === '*'){
                                Ember.set(testVariable, 'includeDaysInFuture', -1);
                            }
                if(testOutcome.ecl.indexOf("<<") === -1 && testOutcome.ecl.indexOf(">>") === -1){
                    Ember.set(testOutcome, 'ecl', "<< " + testOutcome.ecl);
                }
                if(testVariable.ecl.indexOf("<<") === -1 && testVariable.ecl.indexOf(">>") === -1){
                    Ember.set(testVariable, 'ecl', "<< " + testVariable.ecl);
                }
                postData.testOutcome = testOutcome;
                postData.testVariable = testVariable;
                var data = 
                    this.get('ajax').post('/health-analytics-api/cohorts/statistical-test', {
                        contentType: 'application/json; charset=utf-8',
                        data: JSON.stringify(postData)})
                        .then((result) => {
                            this.set('loading', false);
                            this.set('model.cohortData', result);
                            if(testOutcome.includeDaysInFuture === -1){
                                Ember.set(testOutcome, 'includeDaysInFuture', '*');
                            }
                            if(testVariable.includeDaysInFuture === -1){
                                Ember.set(testVariable, 'includeDaysInFuture', '*');
                            }
                        }).catch(function(error) {
                            if (isServerError(error)) {
                                loading = false;
                                error = 'There has been a problem with your request - please check your input.';
                              // handle 5xx errors here
                              return;
                            }
                            // other errors are handled elsewhere
                            throw error;
                          });
            }
            else{
                var data = 
                    this.get('ajax').post('/health-analytics-api/cohorts/select', {
                        contentType: 'application/json; charset=utf-8',
                        data: JSON.stringify(postData)})
                        .then((result) => {
                            var req = this.get('ajax');
                            result.content.forEach(function(item){
                                console.log('Iterating content');
                                item.encounters.forEach(function(encounter){
                                    console.log('Iterating encounters')
                                    var conceptId = encounter.conceptId;
                                    // Changed to SNOWSTORM path - PG
                                    req.request('/find/MAIN/2019-09-30/concepts/' + conceptId).then((result) => {
                                        // Change to set encounter term in spanish using Snowstorm data model - PG 
                                        Ember.set(encounter, 'conceptTerm', result.pt.term);
                                        console.log(encounter.conceptTerm);
                                    }).catch(function(error){
                                        Ember.set(loading, false);
                                        Ember.set(error, 'There has been a problem with your request - please check your input.');
                                    });
                                });
                            });
                            inclusionCriteria.forEach(function (item){
                                var inclusionCriteriaData = {};
                                console.log(item);
                                    if(item.includeDaysInPast !== null && item.includeDaysInPast !== undefined){
                                        if(item.includeDaysInPast === -1){
                                            Ember.set(item, 'includeDaysInFuture', '*');
                                            Ember.set(item, 'includeDaysInPast', '*');
                                        }
                                        inclusionCriteriaData.includeDaysInPast = item.includeDaysInPast;
                                        inclusionCriteriaData.includeDaysInFuture = item.includeDaysInPast;
                                    }
                                    inclusionCriteriaData.has = item.has;
                                    inclusionCriteriaArray.push(inclusionCriteriaData);
                            });
                            
                            this.set('loading', false); 
                            this.set('model.cohortData', result);
                        }).catch(function(error) {
                            if (isServerError(error)) {
                                Ember.set(loading, false);
                                Ember.set(error, 'There has been a problem with your request - please check your input.');
                              // handle 5xx errors here
                              return;
                            }
                            // other errors are handled elsewhere
                            throw error;
                          });
                this.set('loading', loading); 
            this.set('error', error);
            }
            
            
        },
        updateGender(){
            console.log(this);
        },
    }
});