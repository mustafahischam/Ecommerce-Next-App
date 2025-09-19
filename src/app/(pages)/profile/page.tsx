"use client"

import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  EditIcon,
  SaveIcon,
  XIcon,
  ShoppingBagIcon,
  HeartIcon,
  MapIcon,
  ShieldIcon,
  Loader2Icon
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { getUserProfileAction, updateProfileAction, changePasswordAction } from './_action/actions'
import { UserProfile, UpdateProfileRequest, ChangePasswordRequest } from '@/interfaces/profile'

export default function Profile() {
  const { data: session, status } = useSession()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [editedProfile, setEditedProfile] = useState<UpdateProfileRequest>({})
  const [passwordMode, setPasswordMode] = useState(false)
  const [passwordData, setPasswordData] = useState<ChangePasswordRequest>({
    currentPassword: '',
    password: '',
    rePassword: ''
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (status === 'authenticated') {
      loadProfile()
    } else if (status === 'unauthenticated') {
      setLoading(false)
    }
  }, [status]) 

  const loadProfile = async () => {
    setLoading(true)
    const result = await getUserProfileAction()
    if (result.success) {
      const userData = result.data?.data || result.data?.user || session?.user
      setProfile(userData)
      setEditedProfile({
        name: userData?.name || '',
        email: userData?.email || '',
        phone: userData?.phone || ''
      })
    } else {
      if (session?.user) {
        setProfile(session.user)
        setEditedProfile({
          name: session.user.name || '',
          email: session.user.email || '',
          phone: ''
        })
      }
      toast.error(result.error || 'Failed to load profile')
    }
    setLoading(false)
  }

  const handleSaveProfile = async () => {
    setSubmitting(true)


    const changedFields: UpdateProfileRequest = {}

    if (editedProfile.name && editedProfile.name !== profile?.name) {
      changedFields.name = editedProfile.name
    }
    if (editedProfile.phone && editedProfile.phone !== profile?.phone) {
      changedFields.phone = editedProfile.phone
    }


    if (editedProfile.email && editedProfile.email !== profile?.email) {
      changedFields.email = editedProfile.email
    }

    const result = await updateProfileAction(changedFields)
    if (result.success) {
      setProfile({ ...profile, ...changedFields } as UserProfile)
      setEditMode(false)
      toast.success('Profile updated successfully')
    } else {
      toast.error(result.error || 'Failed to update profile')
    }
    setSubmitting(false)
  }

  const handleChangePassword = async () => {
    if (passwordData.password !== passwordData.rePassword) {
      toast.error('Passwords do not match')
      return
    }
    if (passwordData.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setSubmitting(true)
    const result = await changePasswordAction(passwordData)
    if (result.success) {
      setPasswordMode(false)
      setPasswordData({ currentPassword: '', password: '', rePassword: '' })
      toast.success('Password changed successfully! Please login again.')

      // logout after successful password change
      setTimeout(() => {
        signOut({ callbackUrl: '/login?message=password-changed' })
      }, 2000)
    } else {
      toast.error(result.error || 'Failed to change password')
    }
    setSubmitting(false)
  }

  if (status === 'loading' || loading) {
    return (
      <div className="container mx-auto py-6 px-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2Icon className="size-8 animate-spin" />
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-muted-foreground mb-6">Please log in to view your profile</p>
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="size-5" />
                Profile Information
              </CardTitle>
              {!editMode && (
                <Button variant="outline" onClick={() => setEditMode(true)}>
                  <EditIcon className="size-4 mr-2" />
                  Edit
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {editMode ? (
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={editedProfile.name || ''}
                        onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editedProfile.email || ''}
                        onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={editedProfile.phone || ''}
                        onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSaveProfile} disabled={submitting}>
                      {submitting ? <Loader2Icon className="size-4 mr-2 animate-spin" /> : <SaveIcon className="size-4 mr-2" />}
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setEditMode(false)}>
                      <XIcon className="size-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <UserIcon className="size-4 text-muted-foreground" />
                    <span className="font-medium">{profile?.name || 'Not provided'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MailIcon className="size-4 text-muted-foreground" />
                    <span>{profile?.email || 'Not provided'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <PhoneIcon className="size-4 text-muted-foreground" />
                    <span>{profile?.phone || 'Not provided'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">{profile?.role || 'User'}</Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Security Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldIcon className="size-5" />
                Account Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!passwordMode ? (
                <Button variant="outline" onClick={() => setPasswordMode(true)}>
                  Change Password
                </Button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordData.password}
                      onChange={(e) => setPasswordData({ ...passwordData, password: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordData.rePassword}
                      onChange={(e) => setPasswordData({ ...passwordData, rePassword: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleChangePassword} disabled={submitting}>
                      {submitting ? <Loader2Icon className="size-4 mr-2 animate-spin" /> : 'Change Password'}
                    </Button>
                    <Button variant="outline" onClick={() => setPasswordMode(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Links Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/allorders">
                  <ShoppingBagIcon className="size-4 mr-2" />
                  My Orders
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/wishlist">
                  <HeartIcon className="size-4 mr-2" />
                  My Wishlist
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/addresses">
                  <MapIcon className="size-4 mr-2" />
                  My Addresses
                </Link>
              </Button>
            </CardContent>
          </Card>

          {profile?.createdAt && (
            <Card>
              <CardHeader>
                <CardTitle>Account Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarIcon className="size-4" />
                  Member since {new Date(profile.createdAt).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
