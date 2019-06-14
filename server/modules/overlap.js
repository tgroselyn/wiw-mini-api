//using moment for easier comparisons
const moment = require('moment');

//time overlaps checks two shifts, each with start and end
//if there are any overlapping shifts, it returns true
function timeOverlaps(a_start_in, a_end_in, b_start_in, b_end_in) {
    const a_start = moment(a_start_in);
    const a_end = moment(a_end_in);
    const b_start = moment(b_start_in);
    const b_end = moment(b_end_in);

    //check for overlaps
    if (a_start.isSameOrBefore(b_start) && b_start.isSameOrBefore(a_end)) {
        return true; // b starts in a
    } else if (a_start.isSameOrBefore(b_end) && b_end.isSameOrBefore(a_end)) {
        return true; // b ends in a
    } else if (b_start.isBefore(a_start) && a_end.isBefore(b_end)) {
        return true; // a ends in b
    } else {
        return false; //no overlap
    }
}

module.exports = timeOverlaps;