import SentMessageItem from '../MessageItems/SentMessageItem/SentMessageItem';
import ReceivedMessageItem from '../MessageItems/ReceivedMessageItem/ReceivedMessageItem'

function CurrentChatItem({}) {
  return (
    <div class="card">
      <div class="card-header">
        <img src="profile_pics/p2.png" alt="contact-image" class="rounded-circle me-3" width="50"height="50"/>
        <h5>Hami Horworitz</h5>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <div class="d-flex flex-column align-items-end">
            <span class="badge bg-primary">This is a sent message</span>
          </div>
        </div>
        <div class="mb-3">
          <div class="d-flex flex-column align-items-start">
            <span class="badge bg-secondary">This is a received message</span>
          </div>
        </div>
        <div class="mb-3">
          <div class="d-flex flex-column align-items-end">
            <span class="badge bg-primary">Another sent message</span>
          </div>
        </div>
        <div class="mb-3">
          <div class="d-flex flex-column align-items-end">
          <span class="badge bg-primary">Another sent message</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CurrentChatItem;
