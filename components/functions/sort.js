export default function sortAccordingFor(
  arr,
  firstSort,
  isAtoBSorting1,
  secondSort,
  isAtoBSorting2
) {
  // firstSort  is the first sort
  //  isAtoBSorting1 accling for the firstSort 1 is a => b 0 is b=>a
  // secondSort  is the second sort
  // isAtoBSorting2 accling for the secondSort 1 is a => b 0 is b=>a
  if (false) {
    console.warn("add the property only here");
  } else if (false) {
    console.warn();
  } else {
    const sorted = arr.sort((a, b) => {
      if (isAtoBSorting1) {
        if (a[firstSort] > b[firstSort]) return 1;
        else if (a[firstSort] < b[firstSort]) return -1;
      } else {
        if (a[firstSort] > b[firstSort]) return -1;
        else if (a[firstSort] < b[firstSort]) return 1;
      }
      if (isAtoBSorting2) {
        if (a[firstSort] == b[firstSort] && a[secondSort] > b[secondSort])
          return 1;
        else if (a[firstSort] == b[firstSort] && a[secondSort] < b[secondSort])
          return -1;
      } else {
        if (a[firstSort] == b[firstSort] && a[secondSort] > b[secondSort])
          return -1;
        else if (a[firstSort] == b[firstSort] && a[secondSort] < b[secondSort])
          return 1;
      }
      return 0;
    });
    //   console.table(sorted);
    return sorted;
  }
}
