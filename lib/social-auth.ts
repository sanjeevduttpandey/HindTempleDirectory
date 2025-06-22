// Social media authentication utilities
export interface SocialUserData {
  id: string
  email: string
  firstName: string
  lastName: string
  profilePicture?: string
  phone?: string
  city?: string
  dateOfBirth?: string
  gender?: string
  provider: "google" | "facebook" | "github"
}

// Mock social media data fetching (in real implementation, use OAuth APIs)
export async function fetchGoogleUserData(accessToken: string): Promise<SocialUserData> {
  // Simulate API call to Google
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Mock Google user data
  return {
    id: "google_" + Math.random().toString(36).substr(2, 9),
    email: "devotee.example@gmail.com",
    firstName: "Arjun",
    lastName: "Sharma",
    profilePicture: "https://lh3.googleusercontent.com/a/default-user",
    phone: "+64 21 123 4567",
    city: "Auckland",
    dateOfBirth: "1990-05-15",
    gender: "male",
    provider: "google",
  }
}

export async function fetchFacebookUserData(accessToken: string): Promise<SocialUserData> {
  // Simulate API call to Facebook
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Mock Facebook user data
  return {
    id: "facebook_" + Math.random().toString(36).substr(2, 9),
    email: "priya.devotee@facebook.com",
    firstName: "Priya",
    lastName: "Patel",
    profilePicture: "https://graph.facebook.com/v12.0/me/picture",
    phone: "+64 27 987 6543",
    city: "Wellington",
    dateOfBirth: "1988-08-22",
    gender: "female",
    provider: "facebook",
  }
}

export async function fetchGitHubUserData(accessToken: string): Promise<SocialUserData> {
  // Simulate API call to GitHub
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Mock GitHub user data
  return {
    id: "github_" + Math.random().toString(36).substr(2, 9),
    email: "dev.krishna@github.com",
    firstName: "Krishna",
    lastName: "Dev",
    profilePicture: "https://avatars.githubusercontent.com/u/12345",
    city: "Christchurch",
    provider: "github",
  }
}

// OAuth simulation functions
export async function initiateGoogleOAuth(): Promise<string> {
  // In real implementation, this would redirect to Google OAuth
  console.log("Redirecting to Google OAuth...")
  return "mock_google_access_token_" + Date.now()
}

export async function initiateFacebookOAuth(): Promise<string> {
  // In real implementation, this would redirect to Facebook OAuth
  console.log("Redirecting to Facebook OAuth...")
  return "mock_facebook_access_token_" + Date.now()
}

export async function initiateGitHubOAuth(): Promise<string> {
  // In real implementation, this would redirect to GitHub OAuth
  console.log("Redirecting to GitHub OAuth...")
  return "mock_github_access_token_" + Date.now()
}
