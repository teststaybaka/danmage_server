import express = require("express");
import getStream = require("get-stream");
import http = require("http");
import https = require("https");
import { GetChatHandler, GetDanmakuHandler } from "./get_chat_handler";
import { GetChatHistoryHandler } from "./get_chat_history_handler";
import { GetPlayerSettingsHandler } from "./get_player_settings_handler";
import { GetUserHandler } from "./get_user_handler";
import { PostChatHandler } from "./post_chat_handler";
import { ReportUserIssueHandler } from "./report_user_issue_handler";
import { SignInHandler } from "./sign_in_handler";
import { UpdateNicknameHandler } from "./update_nickname_handler";
import {
  ChangePlayerSettingsHandler,
  UpdatePlayerSettingsHandler,
} from "./update_player_settings_handler";
import { Storage } from "@google-cloud/storage";
import { registerCorsAllowedPreflightHandler } from "@selfage/service_handler/preflight_handler";
import {
  registerAuthed,
  registerUnauthed,
} from "@selfage/service_handler/register";
import { SessionSigner } from "@selfage/service_handler/session_signer";
import "../environment";

let HOST_NAME_PROD = "www.danmage.com";

async function main(): Promise<void> {
  if (globalThis.ENVIRONMENT === "prod") {
    let reader = new BucketReader(new Storage(), "danmage-keys");
    let [
      privateKey,
      certificate,
      ca0,
      ca1,
      ca2,
      sessionKey,
      googleOauthClientId,
    ] = await Promise.all([
      reader.read("danmage.key"),
      reader.read("danmage.crt"),
      reader.read("ca_g0.crt"),
      reader.read("ca_g1.crt"),
      reader.read("ca_g2.crt"),
      reader.read("session.key"),
      reader.read("google_oauth_client_id.key"),
    ]);

    let redirectApp = express();
    redirectApp.get("/*", (req, res) => {
      res.redirect(`https://${HOST_NAME_PROD}` + req.path);
    });
    let httpServer = http.createServer(redirectApp);
    httpServer.listen(80, () => {
      console.log("Http server started at 80.");
    });

    let app = registerHandlers(sessionKey, googleOauthClientId);
    let httpsServer = https.createServer(
      {
        key: privateKey,
        cert: certificate,
        ca: [ca0, ca1, ca2],
      },
      app
    );
    httpsServer.listen(443, () => {
      console.log("Https server started at 443.");
    });
  } else if (globalThis.ENVIRONMENT === "dev") {
    let reader = new BucketReader(new Storage(), "danmage-dev-keys");
    let [sessionKey, googleOauthClientId] = await Promise.all([
      reader.read("session.key"),
      reader.read("google_oauth_client_id.key"),
    ]);

    let app = registerHandlers(sessionKey, googleOauthClientId);
    let httpServer = http.createServer(app);
    httpServer.listen(80, () => {
      console.log("Http server started at 80.");
    });
  } else if (globalThis.ENVIRONMENT === "local") {
    let app = registerHandlers("randomlocalkey", "randomclientid");
    let httpServer = http.createServer(app);
    httpServer.listen(8080, () => {
      console.log("Http server started at 8080.");
    });
  } else {
    throw new Error(`Not supported environment ${globalThis.ENVIRONMENT}.`);
  }
}

function registerHandlers(
  sessionKey: string,
  googleOauthClientId: string
): express.Express {
  SessionSigner.SECRET_KEY = sessionKey;

  let app = express();
  registerCorsAllowedPreflightHandler(app);
  registerUnauthed(app, SignInHandler.create(googleOauthClientId));
  registerAuthed(app, GetUserHandler.create());
  registerAuthed(app, PostChatHandler.create());
  registerUnauthed(app, GetChatHandler.create());
  registerAuthed(app, GetChatHistoryHandler.create());
  registerAuthed(app, UpdatePlayerSettingsHandler.create());
  registerAuthed(app, GetPlayerSettingsHandler.create());
  registerAuthed(app, UpdateNicknameHandler.create());
  registerUnauthed(app, ReportUserIssueHandler.create());
  registerUnauthed(app, new GetDanmakuHandler());
  registerAuthed(app, ChangePlayerSettingsHandler.create());

  return app;
}

class BucketReader {
  public constructor(private storage: Storage, private bucketName: string) {}

  public async read(fileName: string): Promise<string> {
    return getStream(
      this.storage.bucket(this.bucketName).file(fileName).createReadStream()
    );
  }
}

main();
