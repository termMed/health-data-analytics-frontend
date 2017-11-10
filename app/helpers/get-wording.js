import Ember from 'ember';

export function getWording(typeId, tense) {
        if(typeId[0] === "64572001" && typeId[1] === "past")
            {
                return "had"
            }
        else if(typeId[0] === "64572001" && typeId[1] === "and")
            {
                return "developed"
            }
        else if(typeId[0] === "64572001" && typeId[1] === "present")
            {
                return "have"
            }
        else if(typeId[0] === "64572001" && typeId[1] === "verb")
            {
                return "devloping"
            }
        else if(typeId[0] === "373873005" && typeId[1] === "past")
            {
                return "took"
            }
        else if(typeId[0] === "373873005" && typeId[1] === "and")
            {
                return "also took"
            }
        else if(typeId[0] === "373873005" && typeId[1] === "present")
            {
                return "take"
            }
        else if(typeId[0] === "373873005" && typeId[1] === "verb")
            {
                return "taking"
            }
        else if(typeId[0] === "71388002" && typeId[1] === "past")
            {
                return "underwent"
            }
        else if(typeId[0] === "71388002" && typeId[1] === "and")
            {
                return "also underwent"
            }
        else if(typeId[0] === "71388002" && typeId[1] === "present")
            {
                return "underwent"
            }
        else if(typeId[0] === "71388002" && typeId[1] === "verb")
            {
                return "undergoing"
            }
        else{return "a"}
}

export default Ember.Helper.helper(getWording);