export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  variables: string[];
}

export const dummyEmailTemplates: EmailTemplate[] = [
  {
    id: "1",
    name: "pickup_reminder_user",
    subject: "Pickup Reminder - Trip #{lead_id}",
    content: `Dear {name},

This is a reminder of your upcoming trip.

Trip Details:
• Date: {travel_date}
• Time: {pickup_time}
• Location: {pickup_location}
• Destination: {dropoff_location}
• Passengers: {number_of_passengers}
• Vehicle Type: {vehicle_type}
• Status: {status}

{final_pickup_info}
{final_destination_info}`,
    variables: [
      "{quotation.id}",
      "{quotation.user.first_name}",
      "{lead.name}",
      "{travel_date}",
      "{pickup_time}",
      "{pickup_location}",
      "{dropoff_location}",
      "{number_of_passengers}",
      "{vehicle_type}",
      "{status}",
      "{final_pickup_info}",
      "{final_destination_info}",
    ],
  },
  {
    id: "2",
    name: "Quotation Created Email",
    subject: "Your Quotation #{quotation.id} has been created",
    content: "Dear {name}, your quotation has been created...",
    variables: ["{name}", "{quotation.id}"],
  },
  {
    id: "3",
    name: "requote_price_changed",
    subject: "Price Update for Quotation #{quotation.id}",
    content: "Dear {name}, the price for your trip has changed...",
    variables: ["{name}", "{quotation.id}", "{new_price}"],
  },
  {
    id: "4",
    name: "Payment Link Email",
    subject: "Payment Link for Trip #{lead_id}",
    content: "Dear {name}, please pay here: {payment_link}",
    variables: ["{name}", "{lead_id}", "{payment_link}"],
  },
  {
    id: "5",
    name: "Payment Success Email",
    subject: "Payment Received for Trip #{lead_id}",
    content: "Dear {name}, we have received your payment.",
    variables: ["{name}", "{lead_id}"],
  },
  {
    id: "6",
    name: "Quotation Rejected Email",
    subject: "Quotation #{quotation.id} Rejected",
    content: "Dear {name}, your quotation was rejected.",
    variables: ["{name}", "{quotation.id}"],
  },
  {
    id: "7",
    name: "lead_accepted",
    subject: "Lead #{lead_id} Accepted",
    content: "Dear {name}, your lead has been accepted.",
    variables: ["{name}", "{lead_id}"],
  },
  {
    id: "8",
    name: "admin_payment_notification",
    subject: "New Payment Received",
    content: "Admin, a new payment was received.",
    variables: ["{amount}", "{user}"],
  },
  {
    id: "9",
    name: "update_lead",
    subject: "Lead #{lead_id} Updated",
    content: "Dear {name}, your lead details have been updated.",
    variables: ["{name}", "{lead_id}"],
  },
  {
    id: "10",
    name: "pickup_alert_admin",
    subject: "Pickup Alert for Trip #{lead_id}",
    content: "Admin, upcoming pickup for trip #{lead_id}.",
    variables: ["{lead_id}", "{time}"],
  },
  {
    id: "11",
    name: "existing_user_quote_request",
    subject: "New Quote Request from Existing User",
    content: "User {name} requested a new quote.",
    variables: ["{name}"],
  },
];
