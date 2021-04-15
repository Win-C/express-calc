
/** Simple demo Express app. */

const express = require("express");
const app = express();

const { findMode, findMean, findMedian } = require("./stats");
const { convertStrNums } = require("./utils");

// useful error class to throw
const { BadRequestError, NotFoundError } = require("./expressError");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";


/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function (req, res) {
  if (!req.query.nums) throw new BadRequestError(MISSING);
  
  const strNums = req.query.nums.split(',');
  let nums = convertStrNums(strNums);
  const mean = findMean(nums);
  
  return res
  .status(200)
  .json({
    operation: "mean",
    value: mean,
  });
});

/** Finds median of nums in qs: returns {operation: "median", result } */
app.get("/median", function (req, res) {
  if (!req.query.nums) throw new BadRequestError(MISSING);
  
  const strNums = req.query.nums.split(',');
  let nums = convertStrNums(strNums);
  const median = findMedian(nums);
  
  return res
  .status(200)
  .json({
    operation: "median",
    value: median,
  });
});

/** Finds mode of nums in qs: returns {operation: "mean", result } */
app.get("/mode", function (req, res) {
  if (!req.query.nums) throw new BadRequestError(MISSING);
  
  const strNums = req.query.nums.split(',');
  let nums = convertStrNums(strNums);
  const mode = findMode(nums);

  return res
    .status(200)
    .json({
      operation: "mode",
      value: mode,
    });
});

/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;