const getQueryUrl = ({ position = "qb", weekNumber }) => {
  return `${process.env.FANTASY_STATS_BASE_URL}/${position}.php?week${weekNumber}&range=week`;
};

module.exports = getQueryUrl;
