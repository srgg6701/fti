import { NextResponse } from "next/server";

// Mock user data
const users = [
  {
    email: "user@example.com",
    password: "password123",
    username: "username",
  },
];

export async function POST(req: Request) {
  console.log("API POST");
  try {
    const { email, password } = await req.json();

    // Simulate server processing delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    console.log({ user, users });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email and/or password." },
        { status: 401 },
      );
    }

    return NextResponse.json({
      success: true,
      username: users[0].username,
      email: user.email,
    });
  } catch (error) {
    console.log("actual error", error);

    return NextResponse.json(
      { error: "Server error. Please try again later." },
      { status: 500 },
    );
  }
}
