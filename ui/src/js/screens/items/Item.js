import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Button from 'grommet/components/Button';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Form from 'grommet/components/Form';
import Footer from 'grommet/components/Footer';
import Toast from 'grommet/components/Toast';
import TextInput from 'grommet/components/TextInput';
import {
  createItem, getItem, editItem, deleteItem
} from '../../actions/items';


class Item extends React.Component {

  constructor(){
    super();
    this.state = {
      editFlow : false,
      id:0
    }
    this.onInputEntered = this.onInputEntered.bind(this);
    this.onSubmitItem=this.onSubmitItem.bind(this);

  }

  componentDidMount(){
    const { match: { params }, dispatch } = this.props;
    console.log(params);
    if(params.id != 0){
      this.setState({
        editFlow: true,
        id:params.id
      })
      getItem(params.id).then((response) => {
      console.log(response);
      this.setState({...response.data});
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  onInputEntered(fieldName, e) {
    console.log(e);
    this.setState({
      [fieldName]: e.target.value
    });
  }

  onSubmitItem(){
    const { id, name, barcode, sku, description } = this.state;
    const data = {
      id,
      name,
      description,
      barcode,
      sku: sku
    }
    if(id == 0) {
    let result = createItem(data);
    result.then(function (response) {
    console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }else {
    let result = editItem(data);
    result.then(function (response) {
    console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  }


  render() {
      return (
        <Form>
          <FormField label="Enter name of the product" >
            <TextInput id='item1'
              name='productName'  onDOMChange={this.onInputEntered.bind(this, 'name' )}
              value={this.state.name}
            />
            </FormField>
          <FormField label="Barcode">
            <TextInput id='item2'
              name='barCode'
              onDOMChange={this.onInputEntered.bind(this, 'barcode' )}
              value={this.state.barcode}
            />
            </FormField>

          <FormField label="Stock keeping unit (SKU)">
            <TextInput id='item3'
            name='item-3'
            onDOMChange={this.onInputEntered.bind(this, 'sku' )}
            value={this.state.sku}
          />
          </FormField>

          <FormField label="Description">
            <TextInput id='item4'
            name='item-4'
            onDOMChange={this.onInputEntered.bind(this, 'description' )}
            value={this.state.description}
          />
          </FormField>

      <Footer pad={{"vertical": "medium"}}>
        <Button label='Submit'
        type='submit'
        primary={true}
        onClick={this.onSubmitItem.bind(this)}
        />
      </Footer>
      </Form>

      )
    }
  }

// Items.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };
//
 const select = state => ({ ...state.employees });

export default connect()(Item);