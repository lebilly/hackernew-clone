function newLinkSubscribe(parent, args, context, info) {
  return context.db.subscription.link(
    { where: { mutation_in: ['CREATED'] } },
    info
  );
}

function newVoteSubscription(parent, args, context, info) {
  return context.db.subscription.vote({
    where: { mutation_in: ['CREATED'] },
    info
  });
}

const newLink = {
  subscribe: newLinkSubscribe
};

const newVote = {
  subscribe: newVoteSubscription
};

module.exports = {
  newLink,
  newVote
};
