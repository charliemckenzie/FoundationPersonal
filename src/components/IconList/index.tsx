import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Theme } from '@mui/material/styles';
import { Icon } from '../Icon';
import type { IconSize, IconColor } from '../Icon';

export type IconListType = 'ul' | 'ol';
export type IconListSize = 'sm' | 'md' | 'lg';
export type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface IconListItem {
  icon?: string;
  text: string;
  heading?: string;
  headingComponent?: HeadingElement;
}

export interface IconListProps {
  items: IconListItem[];
  listType?: IconListType;
  size?: IconListSize;
  defaultIcon?: string;
  iconColor?: IconColor;
}

type SizeConfig = {
  iconSize: Extract<IconSize, 'md' | 'lg' | 'xl'>;
  olIconSize: Extract<IconSize, 'sm' | 'md' | 'lg'>;
  iconSlotWidth: number;
  headingVariant: 'h5' | 'h6';
  textVariant: 'small' | 'body';
  itemGap: number;
  listGap: number;
};

// iconSlotWidth uses theme.spacing multiples that match the ul iconSize in px:
// md = 1rem = 16px = spacing(2), lg = 1.25rem = 20px = spacing(2.5), xl = 1.5rem = 24px = spacing(3)
const sizeConfig: Record<IconListSize, SizeConfig> = {
  sm: { iconSize: 'md', olIconSize: 'sm', iconSlotWidth: 2,   headingVariant: 'h6', textVariant: 'small', itemGap: 1,   listGap: 0.75 },
  md: { iconSize: 'lg', olIconSize: 'md', iconSlotWidth: 2.5, headingVariant: 'h6', textVariant: 'body',  itemGap: 1.5, listGap: 1    },
  lg: { iconSize: 'xl', olIconSize: 'lg', iconSlotWidth: 3,   headingVariant: 'h5', textVariant: 'body',  itemGap: 2,   listGap: 1.25 },
};

export function IconList({ items, listType = 'ul', size = 'md', defaultIcon = 'circle-check', iconColor = 'primary' }: IconListProps) {
  const { iconSize, olIconSize, iconSlotWidth, headingVariant, textVariant, itemGap, listGap } = sizeConfig[size];

  return (
    <Box
      component={listType}
      sx={(theme: Theme) => ({
        listStyle: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(listGap),
      })}
    >
      {items.map((item, index) => {
        const firstLineVariant = item.heading ? headingVariant : textVariant;
        return (
          <Box
            key={index}
            component="li"
            sx={(theme: Theme) => ({
              display: 'flex',
              alignItems: 'flex-start',
              gap: theme.spacing(itemGap),
            })}
          >
            <Box
              sx={(theme: Theme) => ({
                width: theme.spacing(iconSlotWidth),
                height: `calc(${theme.typography[firstLineVariant].fontSize} * ${theme.typography[firstLineVariant].lineHeight})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              })}
            >
              <Icon
                icon={listType === 'ol' ? `no${index + 1}` : (item.icon ?? defaultIcon)}
                size={listType === 'ol' ? olIconSize : iconSize}
                color={iconColor}
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              {item.heading && (
                <Typography
                  variant={headingVariant}
                  component={item.headingComponent ?? headingVariant}
                  sx={{ margin: 0, color: 'text.heading' }}
                >
                  {item.heading}
                </Typography>
              )}
              <Typography variant={textVariant}>{item.text}</Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
