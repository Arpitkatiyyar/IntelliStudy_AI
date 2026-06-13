export async function studentInfo(req, res) {
  res.status(200).json({
    message: {
      name: "Arpit",
      project: "ai study",
    },
  });
}
export async function test(req, res) {
  {
    res.json({ message: "test route is working " });
  }
}