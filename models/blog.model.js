const mongoose = require("mongoose");
const { marked } = require("marked");
const slugify = require("slugify");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);

const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    userId: { type: String, default: "" },
    title: { type: String, required: true },
    description: String,
    state: {
      type: String,
      default: "draft",
      enum: ["draft", "published"],
    },
    readCount: { type: Number, default: 0 },
    readingTime: Number,
    tags: String,
    body: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    // slug: { type: String, required: true, unique: true },
    sanitizedHtml: { type: String, required: true },
  },
  { timestamps: true }
);

blogSchema.pre("validate", function (next) {
  // if (this.title) {
  //   this.slug = slugify(this.title, { lower: true, strict: true });
  // }

  if (this.body) {
    this.sanitizedHtml = dompurify.sanitize(marked(this.body));
  }
  next();
});

module.exports = mongoose.model("blogs", blogSchema);
