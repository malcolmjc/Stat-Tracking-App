const Group = require("../model/group").model;
const User = require("../model/user");

module.exports = (req, res, next) => {
  const groupId = req.params.groupId ? req.params.groupId : req.body.groupId;
  const userId = req.params.userId ? req.params.userId : req.body.userId;
  if (!groupId || !userId) {
    return res.status(401).json({
      message: 'user doesnt belong to group',
    });
  }
  Group.findById(groupId, 'members memberStats').then((group) => {
    User.findById(userId, 'groups username').then((user) => {
      // verify user actually belongs to group
      if (!group.members.includes(user.username) || !user.groups.includes(group._id)) {
        return res.status(401).json({
          message: 'user doesnt belong to group',
          users: [user.username]
        });
      }
      res.locals.group = group;
      res.locals.user = user;
      next();
    });
  });
}
