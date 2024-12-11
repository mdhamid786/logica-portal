const mongoose = require('mongoose');

const homePageSchema = new mongoose.Schema({
  web_page_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WebPage',
    required: true,
  },
  strip_text: {
    type: [String],
    default: [], 
  },
  carousel: {
    type: Object,
    default: {}, 
  },
  banners: {
    type: Object, 
    default: {},
  },
}, {
  timestamps: true, 
 
});

const HomePage = mongoose.model('HomePage', homePageSchema);

module.exports = HomePage;
