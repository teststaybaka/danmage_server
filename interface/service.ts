import { MessageDescriptor, PrimitiveType } from '@selfage/message/descriptor';
import { HostApp, HOST_APP, ChatEntry, CHAT_ENTRY } from './chat_entry';
import { UnauthedServiceDescriptor, AuthedServiceDescriptor } from '@selfage/service_descriptor';

export interface GetChatRequest {
  hostApp?: HostApp,
  hostContentId?: string,
}

export let GET_CHAT_REQUEST: MessageDescriptor<GetChatRequest> = {
  name: 'GetChatRequest',
  factoryFn: () => {
    return new Object();
  },
  fields: [
    {
      name: 'hostApp',
      enumDescriptor: HOST_APP,
    },
    {
      name: 'hostContentId',
      primitiveType: PrimitiveType.STRING,
    },
  ]
};

export interface GetChatResponse {
  chatEntries?: Array<ChatEntry>,
}

export let GET_CHAT_RESPONSE: MessageDescriptor<GetChatResponse> = {
  name: 'GetChatResponse',
  factoryFn: () => {
    return new Object();
  },
  fields: [
    {
      name: 'chatEntries',
      messageDescriptor: CHAT_ENTRY,
      arrayFactoryFn: () => {
        return new Array<any>();
      },
    },
  ]
};

export let GET_CHAT: UnauthedServiceDescriptor<GetChatRequest, GetChatResponse> = {
  name: "GetChat",
  path: "/get_chat",
  requestDescriptor: GET_CHAT_REQUEST,
  responseDescriptor: GET_CHAT_RESPONSE,
};

export interface GetChatHistoryRequest {
  signedSession?: string,
/* Optional. */
  hostApp?: HostApp,
/* If absent, query from the beginning. */
  cursor?: string,
}

export let GET_CHAT_HISTORY_REQUEST: MessageDescriptor<GetChatHistoryRequest> = {
  name: 'GetChatHistoryRequest',
  factoryFn: () => {
    return new Object();
  },
  fields: [
    {
      name: 'signedSession',
      primitiveType: PrimitiveType.STRING,
    },
    {
      name: 'hostApp',
      enumDescriptor: HOST_APP,
    },
    {
      name: 'cursor',
      primitiveType: PrimitiveType.STRING,
    },
  ]
};

export interface GetChatHistoryResponse {
  chatEntries?: Array<ChatEntry>,
  cursor?: string,
}

export let GET_CHAT_HISTORY_RESPONSE: MessageDescriptor<GetChatHistoryResponse> = {
  name: 'GetChatHistoryResponse',
  factoryFn: () => {
    return new Object();
  },
  fields: [
    {
      name: 'chatEntries',
      messageDescriptor: CHAT_ENTRY,
      arrayFactoryFn: () => {
        return new Array<any>();
      },
    },
    {
      name: 'cursor',
      primitiveType: PrimitiveType.STRING,
    },
  ]
};

export let GET_CHAT_HISTORY: AuthedServiceDescriptor<GetChatHistoryRequest, GetChatHistoryResponse> = {
  name: "GetChatHistory",
  path: "/get_chat_history",
  requestDescriptor: GET_CHAT_HISTORY_REQUEST,
  responseDescriptor: GET_CHAT_HISTORY_RESPONSE,
};
