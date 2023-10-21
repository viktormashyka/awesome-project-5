import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 8,
    color: '#fff',
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
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
  linearGradient: {
    width: '100%',
    height: '100%',
    padding: 16,
  },
  itemCell: {
    flex: 1,
    margin: 10,
    padding: 10,
    justifyContent: 'center',
    width: 300,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
  },
  contentContainer: {
    flex: 1,
    width: 300,
    marginVertical: 8,
  },
  listEmpty: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
