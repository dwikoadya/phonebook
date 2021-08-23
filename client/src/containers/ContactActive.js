import { connect } from "react-redux";
import Contact from "../components/Contact";
import { deleteContact, resendContact, clickEditAct } from "../actions";

const mapDispatchToProps = (dispatch, localProps) => ({
  onDelete: () => dispatch(deleteContact(localProps.id)),
  resend: () => dispatch(resendContact(localProps.Phone, localProps.Name, localProps.id)),
  onEdit: () => dispatch(clickEditAct(localProps.id))
})

export default connect(
  null,
  mapDispatchToProps
)(Contact)