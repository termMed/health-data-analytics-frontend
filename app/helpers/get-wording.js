import Ember from 'ember';

export function getWording(typeId) {
        var finding = "404684003";
        var disorder = "64572001";
        var product = "373873005";
        var procedure = "71388002";
        var conceptType = typeId[0];
        var useType = typeId[1];
        if(conceptType === finding && useType === "past")
            {
                return "tuvo hallazgo";
            }
        else if(conceptType === finding && useType === "and")
            {
                return "desarrolló hallazgo";
            }
        else if(conceptType === finding && useType === "present")
            {
                return "tiene hallazgo";
            }
        else if(conceptType === finding && useType === "verb")
            {
                return "desarrollando hallazgo";
            }
        else if(conceptType === disorder && useType === "past")
            {
                return "tuvo";
            }
        else if(conceptType === disorder && useType === "and")
            {
                return "desarrolló";
            }
        else if(conceptType === disorder && useType === "present")
            {
                return "tiene";
            }
        else if(conceptType === disorder && useType === "verb")
            {
                return "desarrollando";
            }
        else if(conceptType === product && useType === "past")
            {
                return "tomó";
            }
        else if(conceptType === product && useType === "and")
            {
                return "había tomado";
            }
        else if(conceptType === product && useType === "present")
            {
                return "toma";
            }
        else if(conceptType === product && useType === "verb")
            {
                return "tomando";
            }
        else if(conceptType === procedure && useType === "past")
            {
                return "había sufrido";
            }
        else if(conceptType === procedure && useType === "and")
            {
                return "tambien sufrió";
            }
        else if(conceptType === procedure && useType === "present")
            {
                return "sufrió";
            }
        else if(conceptType === procedure && useType === "verb")
            {
                return "sufriendo";
            }
        else{return "";}
}

export default Ember.Helper.helper(getWording);
