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
                return "tuvo/tuvieron";
            }
        else if(conceptType === finding && useType === "and")
            {
                return "desarrolló/desarrollaron";
            }
        else if(conceptType === finding && useType === "present")
            {
                return "tiene/tienen";
            }
        else if(conceptType === finding && useType === "verb")
            {
                return "desarrollar";
            }
        else if(conceptType === disorder && useType === "past")
            {
                return "tuvo/tuvieron";
            }
        else if(conceptType === disorder && useType === "and")
            {
                return "desarrolló/desarrollaron";
            }
        else if(conceptType === disorder && useType === "present")
            {
                return "tiene/tienen";
            }
        else if(conceptType === disorder && useType === "verb")
            {
                return "desarrollar";
            }
        else if(conceptType === product && useType === "past")
            {
                return "tomó/tomaron";
            }
        else if(conceptType === product && useType === "and")
            {
                return "había/habían tomado";
            }
        else if(conceptType === product && useType === "present")
            {
                return "toma/toman";
            }
        else if(conceptType === product && useType === "verb")
            {
                return "tomar";
            }
        else if(conceptType === procedure && useType === "past")
            {
                return "se sometió/sometieron";
            }
        else if(conceptType === procedure && useType === "and")
            {
                return "tambien sometido/sometidos";
            }
        else if(conceptType === procedure && useType === "present")
            {
                return "sometido/s";
            }
        else if(conceptType === procedure && useType === "verb")
            {
                return "someter";
            }
        else{return "";}
}

export default Ember.Helper.helper(getWording);
