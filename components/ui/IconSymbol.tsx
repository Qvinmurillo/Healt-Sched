import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native';

// Tipo que define qué librerías puedes usar
type IconLibraryComponent = typeof MaterialIcons | typeof Ionicons;

// Tipo del mapping: incluye la librería y el nombre del ícono
type IconMapping = Record<
  SymbolViewProps['name'],
  {
    iconName: ComponentProps<typeof MaterialIcons>['name'] | ComponentProps<typeof Ionicons>['name'];
    library: IconLibraryComponent;
  }
>;

// Aquí defines tus íconos y de qué librería vienen
const MAPPING: IconMapping = {
  'house.fill': { iconName: 'home', library: MaterialIcons },
  'paperplane.fill': { iconName: 'send', library: MaterialIcons },
  'chevron.left.forwardslash.chevron.right': { iconName: 'code', library: MaterialIcons },
  'chevron.right': { iconName: 'chevron-forward-outline', library: Ionicons },
  'log.in': { iconName: 'log-in-sharp', library: Ionicons },
  'regs.ter': {iconName: 'reader', library: Ionicons},
  'newspaper.fill': {iconName: 'newspaper-outline', library: Ionicons},
  'afil.create': {iconName: 'create-outline', library: Ionicons},
  'arrow.back': {iconName: 'arrow-back-outline', library: Ionicons},
  'med.fill': {iconName: 'medical', library:Ionicons },
  'clip.board': {iconName: 'document-attach', library:Ionicons},
  'rog.fill': {iconName: 'cog', library:Ionicons},
  'add.outline': {iconName: 'add-circle-outline', library: MaterialIcons }, 

};

export type IconSymbolName = keyof typeof MAPPING;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const mapping = MAPPING[name];

  if (!mapping) return null; // fallback si no está definido

  const { iconName, library: IconComponent } = mapping;

  return <IconComponent name={iconName} size={size} color={color} style={style} />;
}
