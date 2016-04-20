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

// Dependencies
var React = require('react')

// Actions
import { PublicationActions } from '../../publication-actions.js'

// Components
var DemoGate = require('../demo-gate/demo-gate.js')
var GateEditorForm = require('../gate-editor-form/gate-editor-form.js')
var GateFormButtonEditor = require('../gate-form-button-editor/gate-form-button-editor.js')

// Component
var GateEditor = React.createClass({
  toggleGate() {
    PublicationActions.toggleGate()
  },
  render() {
    if (this.props.data.get('enabled')) {
      var gateEditor = (
        <div className="editor-wrapper">
          <div className="layout-wrapper">
            <DemoGate
              content={this.props.data.get('content')}
              button={this.props.data.get('button')}
              enabled={this.props.data.get('enabled', false)}
              editor={this.props.editor}
              form={this.props.data.get('form')}
              trigger={this.props.data.get('trigger')}
            />
            <div className="gate-content-editor">
              <GateEditorForm
                content={this.props.data.get('content')}
                button={this.props.data.get('button')}
                editor={this.props.editor}
                form={this.props.data.get('form')}
                trigger={this.props.data.get('trigger')}
                theme={this.props.theme}
              />
            </div>
          </div>
          <GateFormButtonEditor
            theme={this.props.theme}
            cta={this.props.data.getIn(['form', 'cta'])}
          />
        </div>
      )
    } else {
      var gateEditor = (
        <div className="editor-wrapper">
          <span />
        </div>
      )
    }
    return (
      <div className="gate-editor">
        <header>
          <h2>Gate Editor</h2>
          <div className="gate-toggle">
            <button className="button" onClick={this.toggleGate}>
              {this.props.data.get('enabled')? 'Disable Gates' : 'Enable Gates'}
            </button>
          </div>
        </header>

        {gateEditor}

      </div>
    )
  }
})

module.exports = GateEditor
