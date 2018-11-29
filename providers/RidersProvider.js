// TODO fetch from DB
// Probably change it to ProfileProvider 
// as it gets used in different places
import users from '../userList.json';

export default class RidersProvider {
    static getUsers() { //only static until we're actually pulling data
        return(users);
    }

    static getUser(id) {
      return(RidersProvider.getUsers()[id]);
    }
}
