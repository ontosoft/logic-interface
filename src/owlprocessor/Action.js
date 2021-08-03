
export class Action {

    _node = null ;
    _type = null;
    _activity = null;

    constructor(newNode){
        this._node = newNode;
        this._type = null;
    }

    get node(){
        return this._node;
    }

    set node(newNode){
        this._node = newNode;
    }

    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }
     get activity() {
        return this._activity;
    }
    set activity(value) {
        this._activity = value;
    }

}