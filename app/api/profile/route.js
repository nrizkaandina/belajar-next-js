const profileData = {
   name: "Nurviani Rizka Andina",
   role: "Peserta Bootcamp",
   favoriteTech: ["Tailwind CSS", "Javascript"]
};
export async function GET() {
    return Response.json(profileData);
}