const pipedrive = require('pipedrive');

const defaultClient = pipedrive.ApiClient.instance;
const apiToken = defaultClient.authentications.api_key;
apiToken.apiKey = '${process.env.PIPEDRIVE_API_KEY}';
const pipedrivePersonsApi = new pipedrive.PersonsApi();
const pipedriveDealsApi = new pipedrive.DealsApi();
const pipedriveNotesApi = new pipedrive.NotesApi();

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
      console.log(`pipedrivePersonsApi called successfully. Returned data: ${  personData}`);

      const newDeal = pipedrive.NewDeal.constructFromObject({
        title: `New ${  personData.data.primary_email  } Deal`,
        person_id: personData.data.id,
      });

      console.log('Adding Deal.');
      pipedriveDealsApi.addDeal(newDeal).then(
        (dealData) => {
          console.log(`pipedriveDealsApi called successfully. Returned data: ${  dealData}`);

          const newNote = pipedrive.AddNoteRequest.constructFromObject({
            deal_id: dealData.data.id,
            content:
              `From Website Contact Us Form: ${ 
              request.body.input_5 != null ? request.body.input_5 : 'No note supplied'}`,
          });

          console.log('Adding Note.');
          pipedriveNotesApi.addNote(newNote).then(
            (noteData) => {
              console.log(`pipedriveNotesApi called successfully. Returned data: ${  noteData}`);
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
          console.log('pipedriveDealsApi called error');
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
