// apply restricting to specific members
module.exports = (...role) => {
  //  roles is an array like ['admin','lead-guide'] using res-parameter syntax
  return (req, res, next) => {
    console.log(role);
    if (!role.includes(req.user.role)) {
      console.log(role);
      return res.status(403).json({
        status: 'fail',
        message: 'You dont have permissio to perform this action',
      });
    }
    next();
  };
};

// user
// user,admin,manager
