import { connect } from "react-redux";
import Contact from "../components/Contact";
import { deleteContact, resendContact, clickEditAct, deleteContactFailure } from "../actions";

const mapDispatchToProps = (dispatch, localProps) => ({
  onDelete: () => dispatch(deleteContact(localProps.id)),
  resend: () => dispatch(resendContact(localProps.id, localProps.Name, localProps.Phone)),
  onEdit: () => dispatch(clickEditAct(localProps.id))
})

export default connect(
  null,
  mapDispatchToProps
)(Contact)