import { EnumDescriptor, MessageDescriptor, PrimitiveType } from '@selfage/message/descriptor';

export enum BlockKind {
  KeywordBlockKind = 1,
  RegExpBlockKind = 3,
}

export let BLOCK_KIND: EnumDescriptor<BlockKind> = {
  name: 'BlockKind',
  values: [
    {
      name: 'KeywordBlockKind',
      value: 1,
    },
    {
      name: 'RegExpBlockKind',
      value: 3,
    },
  ]
}

export interface BlockPattern {
  kind?: BlockKind,
  content?: string,
}

export let BLOCK_PATTERN: MessageDescriptor<BlockPattern> = {
  name: 'BlockPattern',
  fields: [
    {
      name: 'kind',
      enumType: BLOCK_KIND,
    },
    {
      name: 'content',
      primitiveType: PrimitiveType.STRING,
    },
  ]
};

export interface BlockSettings {
  blockPatterns?: Array<BlockPattern>,
}

export let BLOCK_SETTINGS: MessageDescriptor<BlockSettings> = {
  name: 'BlockSettings',
  fields: [
    {
      name: 'blockPatterns',
      messageType: BLOCK_PATTERN,
      isArray: true,
    },
  ]
};

export enum DistributionStyle {
  RandomDistributionStyle = 1,
  TopDownDistributionStyle = 2,
}

export let DISTRIBUTION_STYLE: EnumDescriptor<DistributionStyle> = {
  name: 'DistributionStyle',
  values: [
    {
      name: 'RandomDistributionStyle',
      value: 1,
    },
    {
      name: 'TopDownDistributionStyle',
      value: 2,
    },
  ]
}

export interface DisplaySettings {
  speed?: number,
/* 0 to 100 percentage. */
  opacity?: number,
  fontSize?: number,
/* 0 to 100 percentage. */
  density?: number,
/* 0 to 100 percentage. */
  topMargin?: number,
/* 0 to 100 percentage. */
  bottomMargin?: number,
  fontFamily?: string,
/* 100 to 900. */
  fontWeight?: number,
  enable?: boolean,
  showUserName?: boolean,
  distributionStyle?: DistributionStyle,
  enableInteraction?: boolean,
}

export let DISPLAY_SETTINGS: MessageDescriptor<DisplaySettings> = {
  name: 'DisplaySettings',
  fields: [
    {
      name: 'speed',
      primitiveType: PrimitiveType.NUMBER,
    },
    {
      name: 'opacity',
      primitiveType: PrimitiveType.NUMBER,
    },
    {
      name: 'fontSize',
      primitiveType: PrimitiveType.NUMBER,
    },
    {
      name: 'density',
      primitiveType: PrimitiveType.NUMBER,
    },
    {
      name: 'topMargin',
      primitiveType: PrimitiveType.NUMBER,
    },
    {
      name: 'bottomMargin',
      primitiveType: PrimitiveType.NUMBER,
    },
    {
      name: 'fontFamily',
      primitiveType: PrimitiveType.STRING,
    },
    {
      name: 'fontWeight',
      primitiveType: PrimitiveType.NUMBER,
    },
    {
      name: 'enable',
      primitiveType: PrimitiveType.BOOLEAN,
    },
    {
      name: 'showUserName',
      primitiveType: PrimitiveType.BOOLEAN,
    },
    {
      name: 'distributionStyle',
      enumType: DISTRIBUTION_STYLE,
    },
    {
      name: 'enableInteraction',
      primitiveType: PrimitiveType.BOOLEAN,
    },
  ]
};

export interface PlayerSettings {
  userId?: string,
  displaySettings?: DisplaySettings,
  blockSettings?: BlockSettings,
}

export let PLAYER_SETTINGS: MessageDescriptor<PlayerSettings> = {
  name: 'PlayerSettings',
  fields: [
    {
      name: 'userId',
      primitiveType: PrimitiveType.STRING,
    },
    {
      name: 'displaySettings',
      messageType: DISPLAY_SETTINGS,
    },
    {
      name: 'blockSettings',
      messageType: BLOCK_SETTINGS,
    },
  ]
};
