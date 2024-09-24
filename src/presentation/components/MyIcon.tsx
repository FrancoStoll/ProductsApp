import {Icon, useTheme} from '@ui-kitten/components';
import {StyleSheet, Text, View} from 'react-native';

interface Props {
  name: string;
  color?: string;
  white?: boolean;
}

export const MyIcon = ({name, color, white = false}: Props) => {
  const theme = useTheme();

  if (white) {
    color = theme['color-info-100'];
  } else if (!color) {
    color = theme['text-basic-color'];
  } else {
    color = theme[color];
  }
  return <Icon style={styles.icon} name={name} fill={color}/>;
};

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
});
