define(function (require) {

  "use strict";

  var $                   = require('jquery'),
      _                   = require('underscore'),
      Backbone            = require('backbone'),
      Marionette          = require('marionette'),
      Mods                = require('app/collections/mods'),
      ModsListView        = require('app/views/mods/list'),
      ListItemView        = require('app/views/servers/mods/list_item'),
      tpl                 = require('text!tpl/servers/mods/list.html');

  return ModsListView.extend({
    itemView: ListItemView,
    template: _.template(tpl),

    events: {
      "click .check-all": "checkAll",
      "click .uncheck-all": "uncheckAll",
    },

    buildItemView: function(item, ItemViewType, itemViewOptions){
      var options = _.extend({model: item, server: this.options.server}, itemViewOptions);
      var view = new ItemViewType(options);
      return view;
    },

    changeAllCheckbox: function(checked) {
      this.$('input:checkbox').map(function (idx, el) {
        return $(el).prop('checked', checked);
      })
    },

    checkAll: function(e) {
      e.preventDefault();
      this.changeAllCheckbox(true);
    },

    uncheckAll: function(e) {
      e.preventDefault();
      this.changeAllCheckbox(false);
    },

    serialize: function() {
      return {
        mods: this.$('input:checkbox:checked').map(function (idx, el) {
            return $(el).val();
          }).get(),
      }
    },
  });

});
