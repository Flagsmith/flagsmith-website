const pipedrive = require('pipedrive');

const defaultClient = pipedrive.ApiClient.instance;
const pipedrivePersonsApi = new pipedrive.PersonsApi();
const pipedriveLeadsApi = new pipedrive.LeadsApi();
const pipedriveNotesApi = new pipedrive.NotesApi();
const apiToken = defaultClient.authentications.api_key;
apiToken.apiKey = process.env.PIPEDRIVE_API_KEY;

export default async function handler(request, response) {
  const newPerson = pipedrive.NewPerson.constructFromObject({
    name: request.body.input_1,
    email: [
      {
        value: request.body.input_2,
        primary: 'true',
      },
    ],
    phone: [
      {
        label: 'work',
        value: request.body.input_3,
        primary: 'true',
      },
    ],
  });

  pipedrivePersonsApi.addPerson(newPerson).then(
    (personData) => {
      console.log(`pipedrivePersonsApi called successfully. Returned data: ${personData}`);

      const newLead = pipedrive.AddLeadRequest.constructFromObject({
        title: `New ${personData.data.primary_email} Lead`,
        person_id: personData.data.id,
      });

      console.log('Adding Lead.');
      pipedriveLeadsApi.addLead(newLead).then(
        (leadData) => {
          console.log(`pipedriveLeadsApi called successfully. Returned data: ${leadData}`);

          const newNote = pipedrive.AddNoteRequest.constructFromObject({
            lead_id: leadData.data.id,
            content: `From Website Contact Us Form: ${
              request.body.input_5 != null ? request.body.input_5 : 'No note supplied'
            }`,
          });

          console.log('Adding Note.');
          pipedriveNotesApi.addNote(newNote).then(
            (noteData) => {
              console.log(`pipedriveNotesApi called successfully. Returned data: ${noteData}`);
              response.status(200).json({
                body: noteData,
              });
            },
            (error) => {
              console.log('pipedriveNotesApi called error');
              response.status(200).json({
                body: error,
              });
            }
          );
        },
        (error) => {
          console.log('pipedriveLeadsApi called error');
        }
      );
    },
    (error) => {
      console.log('pipedrivePersonsApi called error. Returned data:');
      response.status(200).json({
        body: personData,
      });
    }
  );
}
