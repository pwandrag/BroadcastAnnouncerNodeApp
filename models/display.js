exports.display = function (name,title) {
    this.name = name;
    this.title = title;
    this.displayCounter = new Date().getMilliseconds();

    this.getName = function(){ return this.name;}
    this.getTitle = function(){ return this.title;}
    this.getDisplayCounter = function() {return this.displayCounter;}
}
