import {StyleSheet, Platform} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4c669f',
    padding: 16,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  form: {flex: 2.5, justifyContent: 'center', alignItems: 'center'},
  title: {
    marginTop: 8,
    color: '#fff',
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    width: 300,
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#E8E8E8',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    fontFamily: 'Montserrat',
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#212121',
  },
  error: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'center',
  },
  text: {
    marginTop: 16,
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 19,
  },
  textUnderline: {
    marginTop: 16,
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    textDecorationLine: 'underline',
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 19,
  },
  button: {
    height: 50,
    marginBottom: 8,
    width: 300,
    gap: 12,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        borderColor: '#3b5998',
        backgroundColor: '#3b5998',
        shadowColor: '#3b5998',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 4,
      },
      android: {
        borderColor: '#3b5998',
        backgroundColor: '#3b5998',
        elevation: 4,
      },
    }),
    borderRadius: 8,
  },
  smallButton: {
    height: 50,
    width: 120,
    gap: 12,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        borderColor: '#3b5998',
        backgroundColor: '#3b5998',
        shadowColor: '#3b5998',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 4,
      },
      android: {
        borderColor: '#3b5998',
        backgroundColor: '#3b5998',
        elevation: 4,
      },
    }),
    borderRadius: 8,
    marginVertical: 10,
    marginHorizontal: 30,
  },
  icon: {
    position: 'absolute',
    top: 5,
    right: 5,
    margin: 5,
  },
  contentContainer: {
    flex: 1,
    width: 300,
    marginBottom: 8,
  },
  rawBtnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    width: 300,
  },
  rawFavoriteContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
});