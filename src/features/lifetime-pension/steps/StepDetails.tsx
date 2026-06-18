import { useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button } from '../../../components/Button';
import { DescriptionList } from '../../../components/DescriptionList';
import { TextField } from '../../../components/TextField';
import { AddressCapture } from '../../../components/AddressField/AddressCapture';
import { mockAddressProvider } from '../../../components/AddressField/mockAddressProvider';
import type { AustralianAddress, Address } from '../../../components/AddressField';
import type { UserProfile } from '../types';

const ADDRESS_LOOKUP = { provider: mockAddressProvider };

/** Best-effort parse of "line1, suburb, STATE postcode" into AustralianAddress fields. */
function parseAddress(raw: string): AustralianAddress {
  const parts = raw.split(', ').map((s) => s.trim());
  // Last segment may be "VIC 3094"
  const last = parts[parts.length - 1] ?? '';
  const statePostcodeMatch = last.match(/^([A-Z]{2,3})\s+(\d{4})$/);
  if (statePostcodeMatch && parts.length >= 3) {
    return {
      type: 'australian',
      line1: parts[0],
      line2: parts.length === 4 ? parts[1] : '',
      suburb: parts.length === 4 ? parts[2] : parts[1],
      state: statePostcodeMatch[1],
      postcode: statePostcodeMatch[2],
    };
  }
  return { type: 'australian', line1: raw, line2: '', suburb: '', state: '', postcode: '' };
}

function addressToString(addr: Address): string {
  if (addr.type === 'australian') {
    return [addr.line1, addr.line2, addr.suburb, addr.state, addr.postcode].filter(Boolean).join(', ');
  }
  return [addr.line1, addr.line2, addr.city, addr.stateProvince, addr.postcode].filter(Boolean).join(', ');
}

export interface StepDetailsProps {
  profile: UserProfile;
  onProfileUpdate: (next: UserProfile) => void;
}

export function StepDetails({ profile, onProfileUpdate }: StepDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);
  const [addressValue, setAddressValue] = useState<Address>(parseAddress(profile.residentialAddress));

  const fullName = [profile.firstName, profile.middleName, profile.lastName]
    .filter(Boolean)
    .join(' ');

  function handleEdit() {
    setEditedProfile(profile);
    setAddressValue(parseAddress(profile.residentialAddress));
    setIsEditing(true);
  }

  function handleCancel() {
    setIsEditing(false);
  }

  function handleSave() {
    setIsSaving(true);
    setTimeout(() => {
      onProfileUpdate({ ...editedProfile, residentialAddress: addressToString(addressValue) });
      setIsSaving(false);
      setIsEditing(false);
    }, 1500);
  }

  if (isEditing) {
    return (
      <Stack spacing={3}>
        <div>
          <Typography variant="h5" component="h1" sx={{ mb: 1 }}>
            Confirm your details
          </Typography>
          <Typography variant="body" sx={{ color: 'text.primary' }}>
            To complete your application, we need to confirm the following details are correct.
          </Typography>
        </div>

        <Box
          sx={(theme) => ({
            borderRadius: `${theme.shape.lg}px`,
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'border.default',
            px: { xs: 3, sm: 4 },
            pt: { xs: 3, sm: 4 },
            pb: { xs: 3, sm: 4 },
          })}
        >
          <Stack spacing={2}>
            <div>
              <Typography variant="h6" sx={{ mb: 0.5 }}>
                Update your details
              </Typography>
              <Typography variant="body" sx={{ color: 'text.primary' }}>
                If there&rsquo;s an error with your name or date of birth please call us.
              </Typography>
            </div>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2,
              }}
            >
              <TextField
                label="First name"
                value={editedProfile.firstName}
                disabled
                onChange={() => {}}
              />
              <TextField
                label="Last name"
                value={editedProfile.lastName}
                disabled
                onChange={() => {}}
              />
            </Box>
            <TextField
              label="Date of birth"
              value={editedProfile.dateOfBirth}
              disabled
              onChange={() => {}}
            />
            <TextField
              label="Mobile"
              type="tel"
              value={editedProfile.mobilePhone}
              onChange={(e) =>
                setEditedProfile({ ...editedProfile, mobilePhone: e.target.value })
              }
            />
            <Stack spacing={1.5}>
              <Typography variant="body" sx={{ fontWeight: 700, color: 'text.primary' }}>
                Residential address
              </Typography>
              <AddressCapture
                value={addressValue}
                onChange={setAddressValue}
                section="residential"
                lookup={ADDRESS_LOOKUP}
              />
            </Stack>
            <Box sx={{ pt: 2 }}>
              <Divider sx={{ borderColor: 'border.subtle', mb: 3 }} />
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <Button
                  label="Cancel"
                  variant="outlined"
                  size="medium"
                  onClick={handleCancel}
                  disabled={isSaving}
                />
                <Button
                  label="Save changes"
                  variant="contained"
                  size="medium"
                  loading={isSaving}
                  onClick={handleSave}
                />
              </Box>
            </Box>
          </Stack>
        </Box>
      </Stack>
    );
  }

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h5" component="h1" sx={{ mb: 1 }}>
          Confirm your details
        </Typography>
        <Typography variant="body" sx={{ color: 'text.primary' }}>
          To complete your application, we need to confirm the following details are correct.
        </Typography>
      </div>

      <DescriptionList>
        <DescriptionList.Item label="Name" value={fullName} />
        <DescriptionList.Item label="Date of birth" value={profile.dateOfBirth} />
        <DescriptionList.Item label="Phone" value={profile.mobilePhone} />
        <DescriptionList.Item label="Residential address" value={profile.residentialAddress} />
      </DescriptionList>

      <Button
        label="Edit details"
        variant="outlined"
        size="small"
        fullWidth
        onClick={handleEdit}
      />
    </Stack>
  );
}
