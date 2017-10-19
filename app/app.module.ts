import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { AppComponent } from './app.component';

const uri = 'https://1jzxrj179.lp.gql.zone/graphql';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptHttpClientModule,
    ApolloModule,
    HttpLinkModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    // create Apollo
    apollo.create({
      link: httpLink.create({ uri }),
      cache: new InMemoryCache()
    });
  }
}
