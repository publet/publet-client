/*
 * Publet --- online publishing platform
 * Copyright (C) 2016, Publet Inc.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react'

const ErrorMessage = (props)=> {
  if (!props.error || !props.error.get('status')) {
    return <span/>;
  }
  var status = props.error.get('status');
  var message = props.error.get('message');
  var res = '';
  switch (status) {
    case 404:
      res = 'Article not found ( status:' + status + ' )';
      break;
    case 422:
      res = 'Locked article, try again later ( status:' + status + ' )';
      break;
    case 401:
      res = 'You don\'t have permission ( status:' + status + ' )';
      break;
    default :
      res = message + ' ( status:' + status + ' )';
      break;
  }
  return <div className="grid-container error-block"><h2>{res}</h2></div>
}

export default ErrorMessage;