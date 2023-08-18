import getPrismaInstance from "../utils/PrismaClient.js";

export const checkUser = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({ msg: "Email is required", status: false });
    }
    const prisma = getPrismaInstance();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.json({ msg: "User not Found", status: false });
    } else {
      return res.json({ msg: "User Found", status: true, data: user });
    }
  } catch (err) {
    next(err);
  }
};

export const onBoardUser = async (req, res, next) => {
  try {
    const { email, name, about, image: profilePicture } = req.body;
    if (!email || !email || !profilePicture) {
      return res.send("Email, Name and Image are required.");
    }
    const prisma = getPrismaInstance();
    const user = await prisma.user.create({
      data: { email, name, about, profilePicture },
    });
    return res.json({ msg: "Success", status: true, user });
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const prisma = getPrismaInstance();
    const users = await prisma.user.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        email: true,
        profilePicture: true,
        about: true,
      },
    });
    const usersGroupedByInitialLetter = {};
    users?.forEach((user) => {
      const inititialLetter = user.name.charAt(0).toUpperCase();
      if (!usersGroupedByInitialLetter[inititialLetter]) {
        usersGroupedByInitialLetter[inititialLetter] = [];
      }
      usersGroupedByInitialLetter[inititialLetter].push(user);
    });
    res.status(200).json({ users: usersGroupedByInitialLetter });
  } catch (err) {
    next(err);
  }
};
