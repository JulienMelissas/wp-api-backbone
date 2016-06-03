// Create our Post model and Posts collection (these hold our data)
var Post = Backbone.Model.extend({});
var Posts = Backbone.Collection.extend({
  model: Post
});

// We need a veiw to loop over our posts
var PostsView = Backbone.View.extend({
  el: "#posts",
  render: function(){
    var els = [];
    this.collection.each(function(model){
      var v = new PostView({model:model});
      els.push(v.render().el);
    });
    $(this.el).html(els);
  }
});

// Each post should be in an <li> and use the post-template
var PostView = Backbone.View.extend({
  tagName: 'li',
  model: Post,
  template: _.template($('#post-template').html()),
    render: function(){
      this.$el
        .text(this.template(this.model.toJSON()))
        .addClass(this.model.attributes.slug);
      return this;
    },
});

var posts = new Posts();
Backbone.ajax({
  url: "http://wp-api.dev/wp-json/wp/v2/posts",
  data: "",
  success: function(response){
    posts.add(response);

    var view = new PostsView({collection: posts});
    view.render();
  }
});
