import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shadcn/ui"
import { ProfileSettingsForm } from "./profile-settings-form"
import { OnlineStoreSettingsForm } from "./online-store-settings-form"

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList>
          <TabsTrigger value="profile">Profile Settings</TabsTrigger>
          <TabsTrigger value="store">Online Store Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <ProfileSettingsForm />
        </TabsContent>
        <TabsContent value="store">
          <OnlineStoreSettingsForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}