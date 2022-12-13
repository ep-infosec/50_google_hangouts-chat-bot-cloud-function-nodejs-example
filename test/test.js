/*
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const {describe, it} = require('mocha');
const {assert} = require('chai');
const bot = require('../src/bot/bot');

describe('Handler', () => {
  it('should return "Hello World!" card when called', (done) => {
    const returnMessage = {
      cards: [
        {
          header: {
            title: 'Hello World!',
          },
          sections: [
            {
              'widgets': [
                {
                  textParagraph: {
                    text: 'This is capacity bot! We calculated 0.',
                  },
                },
                {
                  image: {
                    imageUrl: 'https://cdn.pixabay.com/photo/2017/10/24/00/39/bot-icon-2883144_640.png',
                  },
                },
              ],
            },
          ],
        },
      ],
    };
    const returnStatus = '200';

    const req = {body: 'ping'};
    const res = {
      send: (message) => {
        assert.isObject(message);
        assert.deepEqual(message, returnMessage);
        done();
      },
      status: (status) => {
        assert.equal(status, returnStatus);
        done();
      },
    };

    bot.conversation(req, res);
  });
});