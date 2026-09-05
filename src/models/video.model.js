import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";

const videoSchema = new Schema(
  {
    videoFile: {
      type: String, //cloudanary url
      required: true,
    },
    thumbnail: {
      type: String, //cloudanary url
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: Number, //cloudanary url
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);



export const Video = mongoose.model("Video", videoSchema);
